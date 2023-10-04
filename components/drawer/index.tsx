'use client';
import DesktopDrawer from './desktop/DesktopDrawer';

export default function Drawer({ fileSpace }: { fileSpace: any }) {
  return (
    <div>
      <DesktopDrawer fileSpace={fileSpace} />
    </div>
  );
}
