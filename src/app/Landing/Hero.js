import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Loading from '../common/Loading';
import PropTypes from 'prop-types';

import { LandingContainer } from '../styles/landing.style';
import {Button} from '../styles/common.styles';

import jawboneImg from '../images/landing-jawbone.png';
import resourcesImg from '../images/landing-resources.png';
import videoImg from '../images/landing-video.png';
import topicsImg from '../images/landing-topics.png';
import foldaImg from '../images/landing-folderss.png';

export default class Hero extends Component {
  static propTypes = {
    submitting: PropTypes.bool.isRequired,
    loggedIn: PropTypes.bool.isRequired
  };

  render() {
    const { submitting, loggedIn } = this.props;

    if (submitting) return <Loading />;

    if (loggedIn) return <Redirect to="/dashboard" />;

    return (
      <LandingContainer>
        <main className="hero">
          <div className="hero-graphics">
            <h1 className="hero-title">Organize &amp; Simplify Learning</h1>
            <p className="hero-text">
               Learning from online resources can sometimes feel chaotic. There are so many sites and video tutorials to keep track of and often no real order for what you should focus on next. 
               Not to mention no easy way to keep related notes for what you've learned!
               Simplify your online learning process with Knowted.
            </p>
            <Button><Link to="/register">Start Learning</Link></Button>
          </div>
        </main>
        <h2>Get organized and stay focused on what you want to learn next</h2>
        <section>
          
          <div>
         
            <h3> Want to learn something new?</h3>
            <img src={topicsImg} alt="example of creating your first topics" className="topics-img" />
            <p>
            Start by adding the topics you'd like to learn. There are so many amazing tutorials and resources online but bookmarking all of the great links you find
             starts to get messy. Knowted lets you create topics to sort them all! 
            </p>
          </div>
          <div>
         
         <h3> Noticing a trend in topics?</h3>
         <img src={jawboneImg} alt="topics in a folder" className="jawbone-img" />
         <p>
         Combining similar topics into folders is as easy as drag and drop. 
         All you have to do is drag and drop topics on to each other to create 
         new folders and keep your Knowted organized. 
         </p>
       </div>
          <div>
          <h3>Your interests are complex and vast.</h3>
          <img src={foldaImg} alt="lots of folders" className="folders-img" />
            <p>
            Make as many folders as you'd like. It may have been overwhelming to try and learn a handful of 
           topics at the same time in the past, but Knowted gives you the tools you need to grow faster. 
            </p>
            
          </div>
          <div>
            <h3>All of your resources in a clean and clear Todo list format</h3>
            <img src={resourcesImg} alt="resources" />
            <p>
              This right here is the peanut butter to the jelly. You can add every resource you find for a topic
              in their very own drag and droppable Todo list. Sort your list and then tackle it from the top down.
            </p>
          </div>
          <div>
            <h3>Streamlined note taking - the cherry on top</h3>
            <img src={videoImg} alt="embedded video and note taking" />
            <p>
              As if you aren't already absolutely in love with the easy of organization Knowted allows you. 
              To toot our final horn, imagine having one clean and clear notebook per each of your topics
              inline with the video tutorials you're watching. 
            </p>
          </div>
        </section>
        <div className="last-pitch">
          <h2>With Knowted you'll be invincible</h2>
          <p>
         Thinking about all of the incredible learning resources online is overwhelming. It's just too hard to focus and way too easy to lose motivation. 
         Stop your procrastinating today and start actually learning! What are you waiting for?
          </p>
          <Button><Link to="/register">Sign Up, it's free!</Link></Button>
        </div>
        <footer>
          made w/ ❤ by <a href="https://github.com/jileon">Janet</a>,{' '}
          <a href="https://github.com/clkent">Chelsea</a>,{' '}
          <a href="https://github.com/morgannewman">Morgan</a>, &amp;{' '}
          <a href="https://github.com/continuouslylearning">Tim</a>
        </footer>
      </LandingContainer>
    );
  }
}
