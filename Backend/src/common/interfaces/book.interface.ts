interface Book {
    _id:string;
    name:string;
    author:string;
    libraryId:string;
    
    status:"AVAILABLE" | "ISSUED";
    issuedTo ?: string;
    issueDate?:Date;
}