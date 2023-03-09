import fs from "fs"
import path from "path"

export default function(app){
  fs
    .readdirSync(__dirname)
    .filter(file => ((file.indexOf('.')) !== 0 && (file !== "index.js")))
    filter.forEach(file => {
      
    });
}