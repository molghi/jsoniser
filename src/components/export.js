function exportNotesJson(dataKeys, dataValues) {
    const data = makeObject(dataKeys, dataValues);

    const now = new Date();
    const nowDate = now.getDate();
    const nowMonth = now.getMonth() + 1;
    const nowYear = now.getFullYear();
    const nowHour = now.getHours();
    const nowMinute = now.getMinutes();

    const filename = `jsoniser-export--${nowDate}-${nowMonth}-${nowYear.toString().slice(2)}--${nowHour}-${nowMinute
        .toString()
        .padStart(2, 0)}.json`;

    const json = JSON.stringify(data, null, 2); // Converting data to JSON: Converts the JavaScript object 'data' into a formatted JSON string. The 'null, 2' arguments ensure the output is pretty-printed with 2-space indentation for readability.
    const blob = new Blob([json], { type: "application/json" }); // Creating a blob: Creates a binary large object (Blob) containing the JSON string, specifying the MIME type as 'application/json' to ensure it's recognised as a JSON file.
    const url = URL.createObjectURL(blob); // Creating a download URL: Generates a temporary URL pointing to the Blob, enabling it to be downloaded as a file by associating it with a download link.

    // Create an invisible anchor element for downloading
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;

    // clicking programmatically and removing it right after
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url); // Clean up the URL
}

// ================================================================================================

function makeObject(dataKeys, dataValues) {
    const objectStrings = dataValues.split("\n");
    const objects = objectStrings.map((string, index) => {
        const splittedString = string.split("|").map((x) => x.trim());
        const splittedKeys = dataKeys.split("|").map((x) => x.trim());
        const obj = {};
        splittedKeys.forEach((key, i) => {
            obj[key.trim()] = splittedString[i].trim();
        });
        return obj;
    });
    return objects;
}

// ================================================================================================

export { exportNotesJson, makeObject };
