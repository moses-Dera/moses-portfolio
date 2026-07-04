import { ImageResponse } from 'next/og';

export const size = {
  width: 64,
  height: 64,
};
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'transparent',
          color: '#743cf7ff',
          fontFamily: 'monospace',
          fontWeight: 900,
          fontSize: 32,
          lineHeight: 0.85,
          textShadow: '1px 0px 0px #743cf7, -1px 0px 0px #743cf7, 0px 1px 0px #743cf7, 0px -1px 0px #743cf7, 1px 1px 0px #743cf7',
        }}
      >
        <div style={{ display: 'flex', transform: 'translateX(8px) translateY(-4px)' }}>
          {' \\\\..'}
        </div>
        <div style={{ display: 'flex' }}>
          {'..\\\\'}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
