import React from "react";
import tw from 'twin.macro';
import {useHistory} from "react-router-dom";

const Selected = tw.a`inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg dark:bg-gray-800 dark:text-blue-500`
const Unselected = tw.a`inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-300`

function SelectionWrapper({selected, children}) {
    return (
        selected ? <Selected>
            {children}
        </Selected> : <Unselected>{children}</Unselected>
    )
}

export default function ({items = []}) {

    const history = useHistory();

    const listItems = items.map((item) => {
        return (
            <li tw="mr-2" onClick={(event => {
                history.push(item.url);
            })}>
                <SelectionWrapper selected={item.selected} href={item.url} aria-current="page"
                                  tw="inline-block p-4 rounded-t-lg">{item.name}</SelectionWrapper>
            </li>
        )
    });

    return (
        <ul tw="flex flex-wrap text-sm font-medium text-center text-gray-900 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
            {listItems}
        </ul>
    )
};