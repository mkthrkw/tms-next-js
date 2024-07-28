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
          key={project.id}
          object={{
            href: `/nextodo/${project.id}`,
            title: project.name,
            text: project.description,
            url: project.image_url
          }}
        />
      ));
    }catch(e){
      return <p className="text-error">エラーが発生しました。</p>;
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