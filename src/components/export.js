import { v4 as uuidv4 } from "uuid";

function exportNotesJson(dataKeys, dataValues) {
    const [data, duplicates] = makeObject(dataKeys, dataValues);
    // if (typeof data === "string") return data;
    if (typeof data !== "object") return data;

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
    const stringKeys = dataKeys.split("|").map((x) => x.trim());
    const stringValues = dataValues.split("\n").map((x) => x.trim());
    const stringValuesArr = stringValues.map((x) => x.split("|").map((x) => x.trim()));
    const allSameLength = [stringKeys, ...stringValuesArr].every((x, i, a) => x.length === a[0].length);

    if (!stringKeys.every((x) => /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(x))) {
        return [
            "Error: Keys must be valid JavaScript property names: start with a letter, _, or $, and contain only letters, numbers, _, or $.",
            null,
        ];
    }

    if (!stringKeys.every((x) => /[a-zA-Z]/.test(x))) {
        return [
            "Error: The key string format is incorrect. It must contain n parts (words), separated by n-1 pipe characters.",
            null,
        ];
    }

    if (!stringValues.every((x) => /[a-zA-Z]/.test(x)) && stringValues.every((x) => x !== "")) {
        return [
            "Error: The values field contains empty value strings with only separators. Provide values or remove empty strings.",
            null,
        ];
    }

    if (!stringValues.every((x) => /^(?:[^"\\]|\\(?:["'\\ntbrf]))*$/.test(x))) {
        return [
            "Error: Some value strings contain special characters (single/double quotes, backslashes, escape sequences) that are not properly escaped. To escape them, a special character must be preceded by \\",
            null,
        ];
    }

    if (stringValues.some((x) => x === "")) {
        return ["Error: Some value strings are empty. Empty strings/lines are not allowed.", null];
    }

    if (allSameLength) {
        const objects = stringValues.map((string, index) => {
            const splittedString = string.split("|").map((x) => x.trim());
            const obj = {};
            stringKeys.forEach((key, i) => {
                obj[key.trim()] = splittedString[i].trim();
            });
            obj.id = uuidv4();
            return obj;
        });
        const objectsStringified = objects.map((x, i, a) => {
            const objAsString = Object.entries(x)
                .filter((y) => y[0] !== "id")
                .map((z) => z[1])
                .join(" "); // object values as one string without the id property
            return objAsString;
        });
        const duplicatedObjects = objectsStringified
            .map((x, i, a) => {
                if (a.indexOf(x) === a.lastIndexOf(x)) return 0;
                else return i + 1;
            })
            .filter((x) => x !== 0);
        return [objects, duplicatedObjects];
    } else {
        const problemStrings = stringValuesArr
            .map((x, i) => {
                if (x.length !== stringKeys.length) return i + 1;
                else return -1;
            })
            .filter((x) => x !== -1)
            .join(", ")
            .trim();
        return [
            `Error: The length of these value strings/lines does not match the length of the key string: ${problemStrings}.  As in your key string, each value string must have ${
                stringKeys.length
            } parts
                separated by ${stringKeys.length - 1} pipe characters. No empty lines.`,
            null,
        ];
    }
}

// ================================================================================================

export { exportNotesJson, makeObject };
