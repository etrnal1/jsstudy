type CardProps = {
    title: string;
    titleCn: string;
    description: string;
    descriptionCn: string;
    buttonText: string;
    buttonTextCn: string;
    bgColor: string;
    imageUrl: string;
    href: string;
}

export default function Card({
    title,
    titleCn,
    description,
    descriptionCn,
    buttonText,
    buttonTextCn,
    bgColor,
    imageUrl,
    href
}: CardProps) {
    return (
        <div className={`${bgColor} rounded-3xl p-8 transition-transform hover:scale-105`}>
            {/* 图片 */}
            <div className="w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden">
                <img 
                    src={imageUrl} 
                    alt={title} 
                    className="w-full h-full object-cover"
                />
            </div>

            {/* 标题 */}
            <h2 className="text-2xl font-medium mb-3">
                {title} <span className="ml-2">{titleCn}</span>
            </h2>

            {/* 英文描述 */}
            <p className="mb-2 text-gray-800">
                {description}
            </p>

            {/* 中文描述 */}
            <p className="mb-6 text-gray-800">
                {descriptionCn}
            </p>

            {/* 按钮 */}
            <a 
                href={href}
                className="inline-block px-6 py-2 rounded-full border-2 border-black hover:bg-black hover:text-white transition-colors"
            >
                {buttonText} {buttonTextCn}
            </a>
        </div>
    )
}