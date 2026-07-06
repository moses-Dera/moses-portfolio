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
          background: '#0B1120',
          color: '#ffffff',
          fontFamily: 'monospace',
          fontWeight: 900,
          fontSize: 40,
          lineHeight: 0.75,
          textShadow: '1px 0px 0px #ffffff, -1px 0px 0px #ffffff, 0px 1px 0px #ffffff, 0px -1px 0px #ffffff, 1px 1px 0px #ffffff, -1px -1px 0px #ffffff',
        }}
      >
        <div style={{ display: 'flex', color: 'white' }}>
          {'\\\\..'}
        </div>
        <div style={{ display: 'flex', color: 'white' }}>
          {'..\\\\'}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
