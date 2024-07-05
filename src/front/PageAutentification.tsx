import React, { useEffect, useState } from "react";
import { Imputs, } from "./composants/Items.tsx";

export default function PageAutentification() {
    const [test, setTest] = useState<any[]>([]);

    useEffect(() => {
        const listerImput = () => {
            const newTest: any[] = [];
            for (let i = 0; i < 10; i++) {
                newTest.push({
                    value: `Value ${i + 1}`,
                    style: { marginBottom: '10px' },
                    onchange: (index, value) => alert(`Changed value at index ${index} to ${value}`),
                    alignement: 'Y'
                });
            }
            setTest(newTest);
        };
        listerImput();
    }, []);

    return (
        <div>
            <h1>Example with 5 Inputs</h1>
            <Imputs items={test} alignement="Y" />
        </div>
    );
}
