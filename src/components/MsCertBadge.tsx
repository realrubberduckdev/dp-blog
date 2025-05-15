import React from 'react';

interface MsCertBadgeProps {
    certificateUrl: string;
    certificateName?: string;
    certificateImgUrl: string;
    certificateImgAltText: string;
    width?: string;
    height?: string;
}

const MsCertBadge: React.FC<MsCertBadgeProps> = ({
    certificateUrl,
    certificateName,
    certificateImgUrl,
    certificateImgAltText,
    width = '148px',
    height = '148px',
}) => {
    return (
        <div style={{ border: '1px solid #ccc', borderRadius: '8px', overflow: 'hidden' }}>
            <a href={certificateUrl} target="_blank" rel="noopener noreferrer">
                <img src={certificateImgUrl}
                    alt={certificateImgAltText}
                    width={width} height={height} />
            </a>
            {certificateName && (
                <p style={{ fontSize: 'small', margin: '8px 0', textAlign: 'center' }}>{certificateName}</p>
            )}
        </div>
    );
};

export default MsCertBadge;