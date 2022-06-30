import { useState } from "react";

export const getName = (keyword: any) => {
    localStorage.getItem('lastKeyword')
    JSON.parse(localStorage.getItem('is-open')||"")
    // const [isOpen, setOpen] = useState(
    //     JSON.parse(localStorage.getItem('is-open')) || false
    //   );
}

export const setName = (keyword: any) => {
    
}
