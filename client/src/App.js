import React, { useEffect, lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';

import Header from './components/header/header.component';
import Footer from './components/footer/footer.component';
import Spinner from './components/Spinner/Spinner.component';
import ErrorBoundary from './components/error-boundary/error-boundary.component';
import Alert from './components/alert/alert.component';

import store from './redux/store';
import { loadUser } from './redux/user/user-actions';
import setAuthToken from './utils/setAuthToken';

import './App.css';

//Components
const HomePage = lazy(() => import('./pages/homepage/homepage.component'));
const RegisterPage = lazy(() => import('./pages/register/register.component'));
const LoginPage = lazy(() => import('./pages/login/login.component'));
const DashboardPage = lazy(() => import('./pages/dashboard/dashboard.component'));
const FormProfile = lazy(() => import('./pages/form-profile/form-profile.component'));
const AddEducationPage = lazy(() => import('./pages/education/education.component'));
const AddExperiencePage = lazy(() => import('./pages/experience/experience.component'));
const EditExperience = lazy(() => import('./pages/edit-experience/edit-experience.component'));
const EditEducation = lazy(() => import('./pages/edit-education/edit-education.component'));
const SearchStudentsPage = lazy(() => import('./pages/students/students.component'));
const StudentProfile = lazy(() => import('./pages/student-profile/student-profile.component'));
const PostsPage = lazy(() => import('./pages/posts/posts.component'));
const PostPage = lazy(() => import('./pages/post/post.component'));
const SendMessagePage = lazy(() => import('./pages/send-message/send-message.component'));
const MessagesPage = lazy(() => import('./pages/messages/messages.component'));
const MessagePage = lazy(() => import('./pages/message/message.component'));



const App = () => {
  useEffect(() => {
    setAuthToken(localStorage.token);
    store.dispatch(loadUser());
  }, []);
  
  return (
    <div>
      <Header />
      <Alert />
      <Switch>
        <ErrorBoundary>
          <Suspense fallback={ <Spinner />}>
            <Route exact path='/' component={HomePage} />
            <Route exact path='/students' component={SearchStudentsPage} />
            <Route exact path='/register' component={RegisterPage} />
            <Route exact path='/login' component={LoginPage} />
            <Route exact path='/profile/:id' component={StudentProfile} />
            <PrivateRoute exact path='/dashboard' component={DashboardPage} />
            <PrivateRoute exact path="/create-profile" component={FormProfile} />
            <PrivateRoute exact path="/edit-profile" component={FormProfile} />
            <PrivateRoute exact path="/add-experience" component={AddExperiencePage} />
            <PrivateRoute exact path="/add-education" component={AddEducationPage} />
            <PrivateRoute exact path="/edit-experience/:exp_id" component={EditExperience} />
            <PrivateRoute exact path="/edit-education/:edu_id" component={EditEducation} />
            <PrivateRoute exact path="/posts" component={PostsPage} />
            <PrivateRoute exact path="/posts/:id" component={PostPage} />
            <PrivateRoute exact path="/send-message/:id" component={SendMessagePage} />
            <PrivateRoute exact path="/messages" component={MessagesPage} />
            <PrivateRoute exact path="/messages/:id" component={MessagePage} />
          </Suspense>
        </ErrorBoundary>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
