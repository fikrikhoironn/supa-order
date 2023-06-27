import { ReactNode } from "react";

interface Props {
    children?: ReactNode;
}

export default function Wrapper({ children }: Props) {
    return (
        <div>
            <div className="max-w-[1280px] mx-auto">{children}</div>
        </div>
    );
}
