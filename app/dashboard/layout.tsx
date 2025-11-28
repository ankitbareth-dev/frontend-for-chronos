import Topbar from "./components/Topbar/Topbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Topbar />
      {children}
    </>
  );
}
