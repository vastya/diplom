import { Icon } from '@iconify/react';
import {ChangeEvent, useState} from 'react';
import { Navigate } from 'react-router-dom';
import {APIERROR, Project} from '../../api/apiTypes';
import { selectAuthUser } from '../../api/endpoints/auth.endpoint';
import { useProjectsQuery } from '../../api/endpoints/project.endpoint';
import SS from '../util/SpinningCircle';
import CreateProjectModel from './CreateProjectModel';
import ProjectRow from './ProjectRow';
import axiosDf from "../../api/axios";

const ProjectCatalog = () => {
  const { authUser } = selectAuthUser();
  const {
    data: projects,
    error,
    isLoading,
  } = useProjectsQuery(authUser?.id as number, { skip: !authUser });
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [searchedProjects, setProjects] = useState< Project[] | undefined>([]);
  const [loading, setLoading] = useState(false);

  let unsubscribe: ReturnType<typeof setTimeout>;

  if (error && (error as APIERROR).status === 401) return <Navigate to='/login' />;

  const searchProjects = async (q: string) => {
    const result = await axiosDf.get(`api/project/search?id=${authUser?.id}&q=` + q);
    return result.data;
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    clearTimeout(unsubscribe);
    const q = e.target.value;
    setInput(q);
    if (!q) return setProjects([]);
    setLoading(true);
    unsubscribe = setTimeout(async () => {
      setProjects(await searchProjects(q));
      setLoading(false);
    }, 1000);
  };

  if (!authUser || isLoading)
    return (
      <div className='z-10 grid w-full place-items-center bg-c-1 text-xl text-c-text'>
        {isLoading ? (
          'Fetching your projects 🚀'
        ) : (
          <div className='flex items-center gap-6'>
            <span className='text-base'>Server is having a cold start</span>
            <SS />
          </div>
        )}
      </div>
    );

  return (
    <>
      <div className='z-10 h-screen min-h-fit grow overflow-auto bg-c-1 px-10 pb-10 pt-12 text-c-5'>
        <div className='flex justify-between flex-col gap-4 md:flex-row md:gap-0'>
          <span className='text-2xl font-semibold tracking-wide'>Projects</span>
          <button onClick={() => setIsOpen(true)} className='btn max-w-[140px]'>
            Create Project
          </button>
        </div>
        <div className='mt-8'>
          <div className='relative'>
            <input
              value={input}
              placeholder='Search projects'
              onChange={handleInputChange}
              className='w-44 rounded-sm border-2 bg-transparent py-[5px] pl-9 pr-2 text-sm outline-none focus:border-chakra-blue'
            />
            <Icon
              width={20}
              icon='ant-design:search-outlined'
              className='absolute top-[6px] left-2 w-[19px]'
            />
          </div>
        </div>
        <div className='min-w-fit'>
          <div className='mt-4 flex py-1 text-sm font-semibold'>
            <div className='w-8 shrink-0'></div>
            <div className='min-w-[10rem] grow px-2'>Name</div>
            <div className='min-w-[18rem] grow px-2 hidden md:block'>Description</div>
            <div className='w-52 shrink-0 px-2 hidden md:block'>Lead</div>
          </div>
          {!projects?.length && !input.length &&
            <div className='mt-[30vh] grid place-items-center text-xl'>
              You haven't created any project yet!! 🚀
            </div>
          }
          {projects && !input.length && (
            projects.length !== 0 ? (
              <div className='mt-1 border-t-2 border-c-3'>
                {projects.map((data, i) => (
                  <ProjectRow key={data.id} idx={i} authUserId={authUser.id} {...data} />
                ))}
              </div>
            ) : (
              <div className='mt-[30vh] grid place-items-center text-xl'>
                You haven't created any project yet!! 🚀
              </div>
            )
          )}
          {!!input.length && (
            <div>
              {!loading && searchedProjects?.length === 0 ? (
                <span className='mt-2 block text-center'>no projects were found :(</span>
              ) : (
                <>
                  <div className='mt-1 border-t-2 border-c-3'>
                    {searchedProjects?.map((data, i) => (
                      <ProjectRow key={data?.id} idx={i} authUserId={authUser.id} {...data} />
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
      {isOpen && <CreateProjectModel onClose={() => setIsOpen(false)} />}
    </>
  );
};


export default ProjectCatalog;
