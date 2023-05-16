type LinkButtonProps = {
    children: React.ReactNode,
    onClick: React.MouseEventHandler<HTMLButtonElement>,
};

const LinkButton = (props: LinkButtonProps) => {
    const { onClick, children } = props;
    return <button className="cursor-pointer hover:underline" onClick={onClick}>{children}</button>;
};

export default LinkButton;