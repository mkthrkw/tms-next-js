import {
  createProject,
  updateProject,
  updateProjectAvatar,
  updateProjectTicketOrder,
  updateProjectListOrder,
  updateProjectsOrder,
  deleteProject,
  getProjects,
  getProjectDetail,
  getProjectNestedData
} from '@/features/projects/actions';
import { fetchGet, fetchPatch, fetchPost, fetchDelete } from '@/util/fetch/methods';
import { uploadImage } from '@/lib/cloudinary/actions';
import { ProjectDetail } from '@/features/projects/type';
import { List } from '@/features/lists/type';
import { ActionState } from '@/types/actionType';
import { list } from 'postcss';

// モックを作成
jest.mock('@/util/fetch/methods', () => ({
  fetchGet: jest.fn(),
  fetchPatch: jest.fn(),
  fetchPost: jest.fn(),
  fetchDelete: jest.fn(),
}));

jest.mock('@/lib/cloudinary/actions', () => ({
  uploadImage: jest.fn(),
}));

describe('Project actions tests', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const prevState:ActionState = { state: 'pending', message: '' };


  describe('createProject', () => {
    test('createProject:resolved', async () => {
      const inputValues = { name: 'New Project', description: 'Project Description' };

      (fetchPost as jest.Mock).mockResolvedValue(undefined);

      const result = await createProject(prevState, inputValues);

      expect(fetchPost as jest.Mock).toHaveBeenCalledWith({
        url: '/tms/projects/',
        hasToken: true,
        params: inputValues,
      });
      expect(result.state).toBe('resolved');
    });

    test('createProject:rejected', async () => {
      const inputValues = { name: 'New Project', description: 'Project Description' };

      (fetchPost as jest.Mock).mockRejectedValue(new Error('Failed to create'));

      const result = await createProject(prevState, inputValues);

      expect(fetchPost as jest.Mock).toHaveBeenCalled();
      expect(result.state).toBe('rejected');
      expect(result.message).toBe('Failed to create');
    });
  });


  describe('updateProject', () => {
    test('updateProject:resolved', async () => {
      const projectId = '123';
      const inputValues = { name: 'Updated Project', description: 'Updated Description' };

      (fetchPatch as jest.Mock).mockResolvedValue(undefined);

      const result = await updateProject(prevState, inputValues, projectId);

      expect(fetchPatch as jest.Mock).toHaveBeenCalledWith({
        url: `/tms/projects/${projectId}/`,
        hasToken: true,
        params: inputValues,
      });
      expect(result.state).toBe('resolved');
    });

    test('updateProject:rejected', async () => {
      const projectId = '123';
      const inputValues = { name: 'Updated Project', description: 'Updated Description' };

      (fetchPatch as jest.Mock).mockRejectedValue(new Error('Update failed'));

      const result = await updateProject(prevState, inputValues, projectId);

      expect(fetchPatch as jest.Mock).toHaveBeenCalled();
      expect(result.state).toBe('rejected');
      expect(result.message).toBe('Update failed');
    });
  });


  describe('updateProjectAvatar', () => {
    test('updateProjectAvatar:resolved', async () => {
      const projectId = '123';
      const fileData = 'data:image/png;base64,...';
      const mockUploadResults = { secure_url: 'https://cloudinary.com/image.png' };

      (uploadImage as jest.Mock).mockResolvedValue(mockUploadResults);
      (fetchPatch as jest.Mock).mockResolvedValue(undefined);

      const result = await updateProjectAvatar(prevState, fileData, projectId );

      expect(uploadImage as jest.Mock).toHaveBeenCalledWith(fileData, projectId);
      expect(fetchPatch as jest.Mock).toHaveBeenCalledWith({
        url: `/tms/projects/${projectId}/`,
        hasToken: true,
        params: {
          image_url: mockUploadResults.secure_url,
        },
      });
      expect(result.state).toBe('resolved');
    });

    test('updateProjectAvatar:rejected', async () => {
      const projectId = '123';
      const fileData = 'data:image/png;base64,...';
      const mockUploadResults = { secure_url: 'https://cloudinary.com/image.png' };

      (uploadImage as jest.Mock).mockResolvedValue(mockUploadResults);
      (fetchPatch as jest.Mock).mockRejectedValue(new Error('Avatar update failed'));

      const result = await updateProjectAvatar(prevState, projectId, fileData);

      expect(uploadImage as jest.Mock).toHaveBeenCalled();
      expect(fetchPatch as jest.Mock).toHaveBeenCalled();
      expect(result.state).toBe('rejected');
      expect(result.message).toBe('Avatar update failed');
    });
  });


  describe('updateProjectTicketOrder', () => {
    test('updateProjectTicketOrder:resolved', async () => {
      const projectId = '123';
      const lists = [
        { id: '1', title: 'List 1', color: 'blue', order: 1, tickets: [{ id: '1' }, { id: '2' }] },
        { id: '2', title: 'List 2', color: 'red', order: 2, tickets: [{ id: '3' }, { id: '4' }] },
      ] as List[];

      (fetchPatch as jest.Mock).mockResolvedValue(undefined);

      const result = await updateProjectTicketOrder(prevState, lists, projectId);

      lists.reverse().map((list) => {
        list.tickets.reverse().map((ticket, index) => {
          ticket.order = index;
        });
      });
      expect(fetchPatch as jest.Mock).toHaveBeenCalledWith({
        url: `/tms/patch-ticket-order/${projectId}/`,
        hasToken: true,
        params: { lists },
      });
      expect(result.state).toBe('resolved');
    });

    test('updateProjectTicketOrder:rejected', async () => {
      const projectId = '123';
      const lists = [
        { id: '2', title: 'List 2', color: 'red', order: 2, tickets: [{ id: '4' }, { id: '3' }] },
        { id: '1', title: 'List 1', color: 'blue', order: 1, tickets: [{ id: '2' }, { id: '1' }] },
      ] as List[];

      (fetchPatch as jest.Mock).mockRejectedValue(new Error('Failed to update ticket order'));

      const result = await updateProjectTicketOrder(prevState, lists, projectId);

      expect(fetchPatch as jest.Mock).toHaveBeenCalled();
      expect(result.state).toBe('rejected');
      expect(result.message).toBe('Failed to update ticket order');
    });
  });


  describe('updateProjectListOrder', () => {
    test('updateProjectListOrder:resolved', async () => {
      const projectId = '123';
      const lists = [
        { id: '1', title: 'List 1', color: 'blue', order: 1, tickets: [{ id: '1' }, { id: '2' }] },
        { id: '2', title: 'List 2', color: 'red', order: 2, tickets: [{ id: '3' }, { id: '4' }] },
      ] as List[];

      (fetchPatch as jest.Mock).mockResolvedValue(undefined);

      const result = await updateProjectListOrder(prevState, lists, projectId);

      lists.reverse().map((list, index) => {
        list.order = index;
      });
      expect(fetchPatch as jest.Mock).toHaveBeenCalledWith({
        url: `/tms/patch-list-order/${projectId}/`,
        hasToken: true,
        params: { lists },
      });
      expect(result.state).toBe('resolved');
    });

    test('updateProjectListOrder:rejected', async () => {
      const projectId = '123';
      const lists = [
        { id: '2', title: 'List 2', color: 'red', order: 2, tickets: [{ id: '4' }, { id: '3' }] },
        { id: '1', title: 'List 1', color: 'blue', order: 1, tickets: [{ id: '2' }, { id: '1' }] },
      ] as List[];

      (fetchPatch as jest.Mock).mockRejectedValue(new Error('Failed to update list order'));

      const result = await updateProjectListOrder(prevState, lists, projectId);

      expect(fetchPatch as jest.Mock).toHaveBeenCalled();
      expect(result.state).toBe('rejected');
      expect(result.message).toBe('Failed to update list order');
    });
  });


  describe('updateProjectsOrder', () => {
    test('updateProjectsOrder:resolved', async () => {
      const projects = [
        { id: '1', name: 'Project 1', description: 'Project 1 Description', order: 1 },
        { id: '2', name: 'Project 2', description: 'Project 2 Description', order: 2 },
      ] as ProjectDetail[];

      (fetchPatch as jest.Mock).mockResolvedValue(undefined);

      const result = await updateProjectsOrder(prevState, projects);

      projects.reverse().map((project, index) => {
        project.order = index;
      });
      expect(fetchPatch as jest.Mock).toHaveBeenCalledWith({
        url: '/tms/patch-project-order/',
        hasToken: true,
        params: { projects },
      });
      expect(result.state).toBe('resolved');
    });

    test('updateProjectsOrder:rejected', async () => {
      const projects = [
        { id: '2', name: 'Project 2', description: 'Project 2 Description', order: 2 },
        { id: '1', name: 'Project 1', description: 'Project 1 Description', order: 1 },
      ] as ProjectDetail[];

      (fetchPatch as jest.Mock).mockRejectedValue(new Error('Failed to update project order'));

      const result = await updateProjectsOrder(prevState, projects);

      expect(fetchPatch as jest.Mock).toHaveBeenCalled();
      expect(result.state).toBe('rejected');
      expect(result.message).toBe('Failed to update project order');
    });
  });


  describe('deleteProject', () => {
    test('deleteProject:resolved', async () => {
      const projectId = '123';

      (fetchDelete as jest.Mock).mockResolvedValue(undefined);

      const result = await deleteProject(prevState, projectId);

      expect(fetchDelete as jest.Mock).toHaveBeenCalledWith({
        url: `/tms/projects/${projectId}`,
        hasToken: true,
      });
      expect(result.state).toBe('resolved');
    });

    test('deleteProject:rejected', async () => {
      const projectId = '123';

      (fetchDelete as jest.Mock).mockRejectedValue(new Error('Failed to delete project'));

      const result = await deleteProject(prevState, projectId);

      expect(fetchDelete as jest.Mock).toHaveBeenCalled();
      expect(result.state).toBe('rejected');
      expect(result.message).toBe('Failed to delete project');
    });
  });


  describe('getProjects', () => {
    test('getProjects:success', async () => {
      const mockProjects = [{ id: 1 }, { id: 2 }, { id: 3 }];
      (fetchGet as jest.Mock).mockResolvedValue(mockProjects);

      const result = await getProjects();

      expect(fetchGet as jest.Mock).toHaveBeenCalledWith({
        url: '/tms/projects',
        hasToken: true,
      });
      expect(result).toEqual(mockProjects.reverse());
    });

    test('getProjects:error', async () => {
      (fetchGet as jest.Mock).mockRejectedValue(new Error('Failed to fetch'));

      // コンソールエラーが発生しないようにスパイ
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      // getTicketNestedDataの実行
      const result = await getProjects();
      // エラーハンドリングが正しくされているか確認
      expect(result).toBeUndefined();
      expect(consoleSpy).toHaveBeenCalledWith(new Error('Failed to fetch'));
      consoleSpy.mockRestore();
    });
  });


  describe('getProjectDetail', () => {
    test('getProjectDetail:success', async () => {
      const projectId = '123';
      const mockProjectDetail = { id: projectId, name: 'Project' };

      (fetchGet as jest.Mock).mockResolvedValue(mockProjectDetail);

      const result = await getProjectDetail(projectId);

      expect(fetchGet as jest.Mock).toHaveBeenCalledWith({
        url: `/tms/projects/${projectId}/`,
        hasToken: true,
      });
      expect(result).toEqual(mockProjectDetail);
    });

    test('getProjectDetail:error', async () => {
      const projectId = '123';

      (fetchGet as jest.Mock).mockRejectedValue(new Error('Failed to fetch project detail'));

      // コンソールエラーが発生しないようにスパイ
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      // getTicketNestedDataの実行
      const result = await getProjectDetail(projectId);
      // エラーハンドリングが正しくされているか確認
      expect(result).toBeUndefined();
      expect(consoleSpy).toHaveBeenCalledWith(new Error('Failed to fetch project detail'));
      consoleSpy.mockRestore();
    });
  });


  describe('getProjectNestedData', () => {
    test('getProjectNestedData:success', async () => {
      const projectId = '123';
      const prevNestedData = {
        lists: [
          { id: 1, tickets: [{ id: 1 }, { id: 2 }] },
          { id: 2, tickets: [{ id: 3 }, { id: 4 }] },
        ],
      };
      const mockNestedData = JSON.parse(JSON.stringify(prevNestedData));

      (fetchGet as jest.Mock).mockResolvedValue(mockNestedData);

      const result = await getProjectNestedData(projectId);

      expect(fetchGet as jest.Mock).toHaveBeenCalledWith({
        url: `/tms/get-nested-project/${projectId}/`,
        hasToken: true,
      });
      expect(result).toEqual(mockNestedData);
      prevNestedData.lists.reverse().forEach((list) => {
        list.tickets.reverse();
      });
      expect(mockNestedData).toEqual(prevNestedData);
    });

    test('getProjectNestedData:error', async () => {
      const projectId = '123';

      (fetchGet as jest.Mock).mockRejectedValue(new Error('Failed to fetch nested data'));

      // コンソールエラーが発生しないようにスパイ
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      // getTicketNestedDataの実行
      const result = await getProjectNestedData(projectId);
      // エラーハンドリングが正しくされているか確認
      expect(result).toBeUndefined();
      expect(consoleSpy).toHaveBeenCalledWith(new Error('Failed to fetch nested data'));
      consoleSpy.mockRestore();
    });
  });

});