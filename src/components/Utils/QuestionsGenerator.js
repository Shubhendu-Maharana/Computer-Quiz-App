import CryptoJS from "crypto-js";
import fs from 'fs';

const API_URL = "https://api.openai.com/v1/chat/completions";
const ENCRYPTED_API_KEY = "U2FsdGVkX1+9GvwYHmkJiU0sHPs3LDKFYlBJtlOqRzCn6w9Y87UvDgAfufaLfaXL+JUu9ktBj/UeP6Dkq02mL7i7AtnztsCTZ/TJJqk5Q3k=";
const API_KEY = CryptoJS.AES.decrypt(ENCRYPTED_API_KEY.toString(), 'shubhendu').toString(CryptoJS.enc.Utf8);
const topic = "Space";
const query = `give 30 questions about ${topic} in json format as like, id: starts from 1 and so on, question: conatains actual question, options: array of 4 options, answer: contains actual answer from options don't wrap these with any name`;
const trimmed = topic.replace(/\s+/g, '');
const baseFileName = `./src/components/Questions/questions-${trimmed}`;

function generateUniqueFileName(baseFileName, count) {
    if (count === 0) {
        return baseFileName + '.json';
    } else {
        return `${baseFileName}-${count}.json`;
    }
}

function writeJsonFile(fileName, data, count) {
    fs.access(fileName, fs.constants.F_OK, (err) => {
        if (err) {
            // File doesn't exist, so write the JSON data to this file
            fs.writeFile(fileName, data, (err) => {
                if (err) {
                    console.error('Error writing JSON file:', err);
                } else {
                    console.log('JSON file has been saved successfully!');
                }
            });
        } else {
            // File already exists, try with a different file name
            const newFileName = generateUniqueFileName(baseFileName, count);
            writeJsonFile(newFileName, data, count + 1);
        }
    });
}

const generateQuestions = async () => {
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: query }],
        })
    }
    console.log("Loading...")

    try {
        const res = await (await fetch(API_URL, requestOptions)).json();
        const data = res.choices[0].message.content.trim();
        // const jsonData = data.match(/\{.*\}/s)[0];
        // console.log(data)
        writeJsonFile(generateUniqueFileName(baseFileName, 0), data, 1);
    } catch (error) {
        console.log("Error: " + error)
    }
}

generateQuestions();