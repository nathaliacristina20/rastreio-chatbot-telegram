export interface Intent {  
    name: string;  
    utterances: Array<string>;
    answers: Array<string>;
    buttons?: Array<string>  
    pattern?: RegExp;
    function?: Function; 
}
