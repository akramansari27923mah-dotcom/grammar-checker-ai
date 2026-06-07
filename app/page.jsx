import MainLayout from "@/components/MainLayout";

export default function Home({ children }) {
  return (
    <div>
        <MainLayout>
          {children}
        </MainLayout>
    </div>
  );
}
