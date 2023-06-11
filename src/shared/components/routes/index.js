import {useRoutes} from 'react-router-dom';
import {NotFound} from '../not-found';
import Layout from '../layout';
import VideoListPage from '../../../modules/video-list';
import AddVideoPage from '../../../modules/add-video';
import WatchVideoPage from '../../../modules/watch-video';
import {Albums} from '../../../modules/albums';
import {SingleAlbumPage} from "../../../modules/single-album-page";


const Routes = () => {

  return useRoutes([
    { element: <Layout />, children: [
      { path: '/', element: <VideoListPage />, children: [
        { path: 'add-video', element: <AddVideoPage /> },
      ],
      },
      { path: '/albums', element: <Albums />},
      { path: '/albums/:albumID', element: <SingleAlbumPage /> },
      { path: '/watch/:videoId', element: <WatchVideoPage /> },
      { path: '*', element: <NotFound text="Not found page"/> },
    ]},
  ]);
};

export default Routes;
