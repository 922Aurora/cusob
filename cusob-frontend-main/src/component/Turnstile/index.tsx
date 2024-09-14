import React, { useEffect, useState } from 'react';
import nextConfig from "../../../next.config.mjs";

interface TurnstileProps {
    onVerify: (token: string) => void;
}

const Turnstile: React.FC<TurnstileProps> = ({ onVerify }) => {
    const [scriptLoaded, setScriptLoaded] = useState(false);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
        script.async = true;
        script.defer = true;
        script.onload = () => {
            window.turnstileCallback = handleVerification;
            setScriptLoaded(true); // 标记脚本加载完成
        };
        document.body.appendChild(script);
    }, []);

    useEffect(() => {
        if (scriptLoaded) {
            // 当脚本加载完成时，初始化 Turnstile
            if (window.turnstile) {
                window.turnstile.render('#turnstile-container', { sitekey: '0x4AAAAAAAbYPWJf81s_lrmo', callback: handleVerification });
            }
        }
    }, [scriptLoaded]);

    const handleVerification = (token: string) => {
        onVerify(token);
    };

    if (!scriptLoaded) {
        return null; // 脚本加载未完成时不渲染组件
    }

    return (
        <div
            id="turnstile-container"
            className="cf-turnstile"
            data-sitekey={process.env.DATA_SITE_KEY}
            data-lang="en"
            data-callback="turnstileCallback"
        ></div>
    );
};

export default Turnstile;
