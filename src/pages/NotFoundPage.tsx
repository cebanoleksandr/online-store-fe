import MainLayout from "../components/layouts/MainLayout"

const NotFoundPage = () => {
  return (
    <MainLayout>
      <h1 className="text-4xl font-bold">404 - Not Found</h1>
      <p className="mt-4 text-lg">Sorry, the page you are looking for does not exist.</p>
    </MainLayout>
  )
}

export default NotFoundPage
