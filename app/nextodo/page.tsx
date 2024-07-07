import LinkCardWithAvatar from "@/components/cards/LinkCardWithAvatar";
import fetchGet from "@/util/fetch/get";

export default async function Page() {

  const ProjectList = async () => {
    try{
      const projects = await fetchGet({
        url: '/tms/projects/',
        hasToken: true,
      });
      return await projects.map((project: any) => (
        <LinkCardWithAvatar
          type="page"
          object={{
            href: `/nextodo/${project.id}`,
            key: project.id,
            title: project.name,
            text: project.description,
            url: project.image_url
          }}
        />
      ));
    }catch(e){
      console.error(e);
    }
  }

  return (
    <>
      <div className="p-8 w-full h-full">
        <h1 className="text-4xl text-center mb-10">This is ProjectList</h1>
          <div className="md:flex md:flex-wrap md:flex-row flex-col gap-4 mx-auto justify-between max-w-3xl">
            <ProjectList />
          </div>
      </div>
    </>
  );
}