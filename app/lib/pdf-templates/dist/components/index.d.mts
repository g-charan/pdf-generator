import * as react_jsx_runtime from 'react/jsx-runtime';
import { CreditReference, CreditApplication, LetterOfCredit, Invoice } from '../types.mjs';

interface Props$2 {
    data: CreditReference;
}
declare function CreditReferenceTemplate({ data }: Props$2): react_jsx_runtime.JSX.Element;

interface Props$1 {
    data: CreditApplication;
}
declare function CreditApplicationTemplate({ data }: Props$1): react_jsx_runtime.JSX.Element;

interface Props {
    data: LetterOfCredit;
}
declare function LetterOfCreditTemplate({ data }: Props): react_jsx_runtime.JSX.Element;

declare function PdfTemplate(props: Invoice): react_jsx_runtime.JSX.Element;

export { CreditApplicationTemplate, CreditReferenceTemplate, LetterOfCreditTemplate, PdfTemplate };
