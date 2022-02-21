export function SlideNav(props: any) {
  return <ul className="SlideNav" {...props} />;
}

export function SlideNavItem(
    {
      isCurrent, ariaLabel, onClick} : {
        isCurrent: boolean, 
        ariaLabel: string,
        onClick: ()=>void 
    }) {
  return (
    <li className="SlideNavItem">
      <button aria-label={ariaLabel} onClick={onClick} aria-current={isCurrent}>
        <span />
      </button>
    </li>
  );
}