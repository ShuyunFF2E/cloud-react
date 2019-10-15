export default function getUuid() {
    const now = Date.now();
    return `upload-${now}`;
}