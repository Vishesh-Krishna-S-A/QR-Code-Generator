import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";

inquirer
.prompt([
    {
        message: "Enter the URL: ",
        name: "URL"
    }
])
.then((answers) => {
    const url = answers.URL;
    const qrcode = qr.image(url);
    qrcode.pipe(fs.createWriteStream("./qrcode.png"));

    fs.writeFile('qrcode_url.txt', url, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    }); 
})
.catch((error) => {
    if (error.isTtyError) {
        console.log("Prompt couldn't be rendered in the current environment");
    } else {
        console.log("Something else went wrong");
    }
});