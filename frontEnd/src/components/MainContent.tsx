type Maincontent = {
    title : string,
    content : string,
    createdAt : string
    authorName : string,
    onClick? : () => void
}

export const MainContent = ({title , content , createdAt , authorName ,onClick} : Maincontent) => {

    const words = content.split(" ")
    const previewContent = words.slice(0,50).join(" ")

    const dateAndTime = createdAt.split("T")
    const reversedDate = dateAndTime[0] 
    const publishedDate = reversedDate.split("-").reverse().join("-")

    return <div onClick={onClick} className="min-w-lg max-w-3xl font-roboto border-b border-purple-200 
    shadow-[0px_4px_10px_rgba(0,0,0,0.1)] rounded-lg flex flex-col gap-2 cursor-pointer px-6 pt-2 bg-white">
        <div className="text-[13px] flex gap-2">
            <span className="text-gray-600">{publishedDate}</span>
            <span>By : {authorName}</span>
        </div>
        <span className="text-xl font-bold">{title}</span>
        <p className="text-slate-600 pb-3 text-justify font-serif">{previewContent + "..."}</p>
    </div>
}