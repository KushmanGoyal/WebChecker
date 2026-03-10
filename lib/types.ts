export interface ScanResult {
    name: string;
    url: string;
    status: "UP" | "DOWN";
    statusCode: number | null;
    responseTime: number | null;
}
