import React from 'react';

interface MsCertBadgeProps {
    certificateId: string;
    certificateName: string;
    certificateImgUrl: string;
    width?: string;
    height?: string;
}

const MsCertBadge: React.FC<MsCertBadgeProps> = ({
    certificateId,
    certificateName,
    certificateImgUrl,
    width = '100%',
    height = '600px',
}) => {
    const url = `https://learn.microsoft.com/api/credentials/share/en-us/Dushyant/${certificateId}`;
    const altText = `Microsoft Certification Badge for ${certificateId}`;

    return (
        <div style={{ border: '1px solid #ccc', borderRadius: '8px', overflow: 'hidden' }}>
            <a href={url} target="_blank" rel="noopener noreferrer">
                <img src={certificateImgUrl}
                    alt={altText}
                    width={width} height={height} />
            </a>
            <p style={{ fontSize: 'small', margin: '8px 0' }}>{certificateName}</p>
        </div>
    );
};

export default MsCertBadge;