import {parse} from 'csv-parse/sync';
import fs from 'fs';


export const records = (filePath: string): any[] => {
    const file: string = fs.readFileSync(filePath, 'utf-8');
    return parse(file, {
        columns: true,
        skip_empty_lines: true,
        delimiter: ','
    });
};