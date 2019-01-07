//-------------------------------------------------
// LANDING PAGE STYLES
// ------------------------------------------------

import hero from '../images/lines.png';
import styled from 'styled-components';

export const LandingContainer = styled.div`
text-align: center;

  .hero {
    margin: 0 auto;
    text-align: center;
    background: #aee192;

    .hero-graphics {
      padding: 160px 0;
      /* background: url(${hero}) no-repeat; */

			@media (max-width: 650px) {
       padding: 60px 0;
      }
    }

		.hero-text {
			font-size: 1.9rem;
    max-width: 1155px;
    margin: 45px auto;
    margin-bottom: 60px;
    line-height: 2.85rem;
		padding: 0 20px;

		@media (max-width: 650px) {
			 font-size: 1.25rem;
			 line-height: 1.85rem;
      }

  }

  }

  

  h2 {
    background: #92E1B5;
		padding: 25px 7% 30px 7%;
  }

	.last-pitch {
		background: #8CBCF4;
		margin-top: 180px;
	h2 {
		background: #8FCDE7;
	}

	p {
		font-size: 1.6em;
    margin: 60px auto;
    line-height: 2.3rem;
		max-width: 990px;
	}
	}

section {

  max-width: 1255px;
  margin: 0 auto;

 div {
	margin-top: 180px;
	/* background: url(${hero}) no-repeat; */
	display: grid;
	grid-template-rows: 110px 1fr 270px;
justify-content: center;

@media (max-width: 650px) {
	margin-top: 80px;
	padding: 0 20px;
    grid-template-rows: 90px 1fr 270px;
}

	h3 {
		font-size: 2em;
		background: #F2EC27;
    padding: 0px 10px 4px 10px;
		margin-bottom: 60px;
		justify-self: center;

		@media (max-width: 650px) {
			font-size: 1.25em;
    line-height: 1.5rem;
    padding-top: 12px;
		margin-bottom: 23px;
}
	}

	img {

		justify-self: center;
		width: 75%;
		border-radius: 8px;
		-webkit-box-shadow: 0px 8px 39px -3px rgba(0,0,0,0.08);
    -moz-box-shadow: 0px 8px 39px -3px rgba(0,0,0,0.08);
    box-shadow: 0px 8px 39px -3px rgba(0,0,0,0.08);

		@media (max-width: 650px) {
			width: 100%;
} 
	}

	.topics-img {
		width: 65%;
		@media (max-width: 650px) {
			width: 100%;
} 
	}
	.jawbone-img {
		width: 62%;
		@media (max-width: 650px) {
			width: 100%;
} 
	}

	.folders-img {
		width: 93%;
		@media (max-width: 650px) {
			width: 100%;
} 
	}

	p {
		font-size: 1.6em;
    max-width: 701px;
    margin: 60px auto;
    line-height: 2.3rem;


		@media (max-width: 650px) {
			font-size: 1.2em;
			line-height: 2rem;
		}
	}
 }
}

footer {
	background: #8CBCF4;
}
`;
