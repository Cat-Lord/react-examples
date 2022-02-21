// this argument syntax is a problem with typescript: 
//  https://github.com/Microsoft/TypeScript/issues/29526
export function SpacerGif( {width} : { width: any }) {
  return (
    <div 
      style={{display: 'inline-block', width}}
    />
  );
}