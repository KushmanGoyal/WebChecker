import { NextResponse } from "next/server";
import { sites } from "@/lib/sites";
import type { ScanResult } from "@/lib/types";

const FETCH_HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
};

async function checkSite(site: { name: string; url: string }): Promise<ScanResult> {
    const start = Date.now();
    try {
        // HEAD is much faster — only fetches headers, no body download
        let response = await fetch(site.url, {
            method: "HEAD",
            signal: AbortSignal.timeout(10000),
            redirect: "follow",
            headers: FETCH_HEADERS,
        });

        // Some servers don't support HEAD — retry with GET
        if (response.status === 405) {
            response = await fetch(site.url, {
                method: "GET",
                signal: AbortSignal.timeout(10000),
                redirect: "follow",
                headers: FETCH_HEADERS,
            });
        }

        const responseTime = Date.now() - start;

        // Only HTTP 200 is considered UP
        const isUp = response.status === 200;

        return {
            name: site.name,
            url: site.url,
            status: isUp ? "UP" : "DOWN",
            statusCode: response.status,
            responseTime,
        };
    } catch {
        const responseTime = Date.now() - start;
        return {
            name: site.name,
            url: site.url,
            status: "DOWN",
            statusCode: null,
            responseTime: responseTime > 100 ? responseTime : null,
        };
    }
}

export async function GET() {
    // Use Promise.allSettled so one failure never kills the entire scan
    const settled = await Promise.allSettled(sites.map(checkSite));

    const results: ScanResult[] = settled.map((outcome, i) => {
        if (outcome.status === "fulfilled") {
            return outcome.value;
        }
        // If the promise itself rejected unexpectedly, still return a result
        return {
            name: sites[i].name,
            url: sites[i].url,
            status: "DOWN" as const,
            statusCode: null,
            responseTime: null,
        };
    });

    return NextResponse.json(results);
}
