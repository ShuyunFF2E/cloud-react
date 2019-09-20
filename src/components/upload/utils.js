const now = Date.now();

export default function getUuid() {
    return `upload-${now}`;
}