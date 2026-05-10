import { fontMono } from '../data/posts';

export default function MonoLabel({ children, style = {} }) {
  return (
    <div style={{
      fontFamily: fontMono,
      fontSize: 10,
      letterSpacing: 1.5,
      textTransform: 'uppercase',
      opacity: 0.6,
      ...style,
    }}>
      {children}
    </div>
  );
}
