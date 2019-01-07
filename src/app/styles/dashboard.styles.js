//-------------------------------------------------
// DASHBOARD STYLES
// ------------------------------------------------

import styled from 'styled-components';

export const DashMain = styled.main`
  margin: 0 30px;
  @media (max-width: 450px) {
    margin: 0 10px;
  }
`;

export const DashboardContainer = styled.section`
  max-width: 1255px;
  margin: 80px auto;

  @media (max-width: 450px) {
    margin: 40px auto;
  }

  .welcome-zero-case {
    background: #f1f1f1;
    padding: 40px;
    text-align: center;
    border-radius: 20px;
    margin-bottom: 60px;

    p {
      margin: 0 25px 15px 25px;
      font-size: 1.5em;
      line-height: 1.5em;
      letter-spacing: 0.5px;
    }
  }
`;

export const RecentlyViewedContainer = styled.div`
  .recent-resources {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    text-align: center;
    list-style: none;
    padding: 0;
    margin-bottom: 60px;

    @media (max-width: 1235px) {
      grid-template-columns: 1fr;
    }

    a {
      margin-right: 20px;
      :last-child {
        margin-right: 0;
      }

      :hover {
        color: #fff;
      }

      @media (max-width: 1235px) {
        margin: 10px 0;
      }
    }

    li {
      border: 2px solid #d0d0d0;
      height: 111px;
      border-radius: 8px;
      display: flex;
      justify-content: center;
      align-items: center;

      :hover {
        border: 2px solid #aee192;
        background-color: #aee192;
      }
    }

    span {
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      max-width: 355px;
    }
  }
`;

export const AllTopicsContainer = styled.div`
  label,
  input {
    font-family: omnes-pro, sans-serif;
    font-weight: 300;
    font-size: 1.125rem;
  }

  .edit-folder-form,
  .edit-topic-form,
  .add-topic-form {
    display: inline-flex;
    flex-direction: row;
    max-width: 113px;

    input {
      border: none;
      outline: none;
      max-width: 126px;
      text-align: center;
      border-bottom: 1px dashed #d0d0d0;
    }
  }

  .folders-container {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    margin-bottom: 40px;

    @media (max-width: 1255px) {
      grid-template-columns: repeat(5, 1fr);
    }
    @media (max-width: 960px) {
      grid-template-columns: repeat(2, 1fr);
    }

    .folder-wrap {
      text-align: center;
      margin-bottom: 20px;
      padding: 0 16px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      min-height: 155px;

      .folder {
        cursor: pointer;
        position: relative;
        margin: 0 auto;
        border: none;
        height: 108px;
        width: 144px;
        perspective: 720px;
        border-radius: 7px;
        margin-bottom: 10px;

        ::before,
        ::after,
        span::before,
        span::after {
          content: '';
          position: absolute;
          border-radius: 7px;
        }

        ::before {
          width: 100%;
          height: 92%;
          bottom: 0;
          left: 0;
        }

        ::after {
          top: 0;
          left: 0;
          width: 40%;
          height: 50%;
          z-index: 1;
        }

        span {
          ::after {
            width: 90%;
            height: 85%;
            bottom: 0;
            left: 5%;
            background-color: #fff;
            z-index: 2;
            transition: transform 250ms ease 0ms;
            transform: translate3d(0px, 0px, 0px);
          }
          ::before {
            width: 100%;
            height: 92%;
            bottom: 0;
            left: 0;
            z-index: 3;
            content: '';
            transition: transform 500ms ease 0ms;
            transform-origin: 0 100% 0;
            outline: 1px solid transparent; /* Firefox anti-aliasing hack */
            transform-style: preserve-3d;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
      }

      .folder-open span::before {
        transform: rotateX(-35deg);
        bottom: -1px;
      }

      /*Folder colors*/
      /* 1 */
      :nth-of-type(7n + 1) .folder::before,
      :nth-of-type(7n + 1) .folder::after {
        background-color: #93c079;
      }
      :nth-of-type(7n + 1) .folder span::before {
        background-color: #aee192;
      }

      /* 2 */
      :nth-of-type(7n + 2) .folder::before,
      :nth-of-type(7n + 2) .folder::after {
        background-color: #81c5a0;
      }
      :nth-of-type(7n + 2) .folder span::before {
        background-color: #92e1b5;
      }

      /* 3 */
      :nth-of-type(7n + 3) .folder::before,
      :nth-of-type(7n + 3) .folder::after {
        background-color: #80c4bd;
      }
      :nth-of-type(7n + 3) .folder span::before {
        background-color: #92e1d8;
      }

      /* 4 */
      :nth-of-type(7n + 4) .folder::before,
      :nth-of-type(7n + 4) .folder::after {
        background-color: #7ab0c7;
      }
      :nth-of-type(7n + 4) .folder span::before {
        background-color: #8fcde7;
      }

      /* 5 */
      :nth-of-type(7n + 5) .folder::before,
      :nth-of-type(7n + 5) .folder::after {
        background-color: #7aa6d9;
      }
      :nth-of-type(7n + 5) .folder span::before {
        background-color: #8cbcf4;
      }

      /* 6 */
      :nth-of-type(7n + 6) .folder::before,
      :nth-of-type(7n + 6) .folder::after {
        background-color: #7f93db;
      }
      :nth-of-type(7n + 6) .folder span::before {
        background-color: #8ca3f4;
      }

      /* 7 */
      :nth-of-type(7n + 7) .folder::before,
      :nth-of-type(7n + 7) .folder::after {
        background-color: #7d79d9;
      }
      :nth-of-type(7n + 7) .folder span::before {
        background-color: #8f8cf4;
      }
    }
  }

  .lonely-topics-container {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    text-align: center;
    margin-bottom: 0 30px 60px 30px;

    @media (max-width: 1255px) {
      grid-template-columns: repeat(6, 1fr);
    }
    @media (max-width: 960px) {
      grid-template-columns: repeat(3, 1fr);
    }

    @media (max-width: 460px) {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  /* Shared Topic styles */
  .topic-wrap {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    max-width: 158px;
    margin-bottom: 30px;
    padding: 20px;
  }

  .paper,
  .add-topic-btn {
    height: 136px;
    width: 112px;
    border: 2px solid #aeaeae;
    background: #fff;
    border-radius: 6px;
    margin: 0 auto;
    margin-bottom: 10px;
  }

  .paper {
    border-radius: 6px 22px 6px 6px;
    span {
      border: 2px solid #aeaeae;
      height: 26px;
      width: 26px;
      margin-left: 30px;
      position: absolute;
      margin-top: -2px;
      border-radius: 0 22px 0 6px;
    }
  }

  .add-topic-btn {
    font-size: 1em;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 2px dashed #d0d0d0;
    color: #d0d0d0;
    outline: none;
    margin-top: 20px;

    span {
      font-size: 3rem;
      padding: 0;
      line-height: 1;
      margin-top: 25px;
    }
  }

  .topic-btn {
    margin-top: 20px;
  }

  .delete-btn {
    position: absolute;
    margin-left: 60px;
    margin-top: -26px;
    height: 32px;
  }
`;

export const JawBoneContainer = styled.div`
  min-height: 260px;

  span.arrow-up {
    position: relative;
    content: '';
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 14px 10px 14px;
    border-color: transparent transparent #f1f1f1 transparent;
  }

  .jawbone-folder-items {
    position: absolute;
    display: flex;
    flex-direction: row;
    margin: 10px 0;
    padding: 15px;
    background: #f1f1f1;
    border-radius: 6px;
    width: 100%;
    flex-wrap: wrap;
    min-height: auto;
    z-index: 10;
    left: 5%;
    width: 90%;

    .jawbone-items-wrapper {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      margin: 0 auto;
    }

    .topic-wrap {
      padding-right: 40px;
      padding-top: 20px;
      padding-bottom: 0;
      min-width: auto;
      margin: 0;
    }
  }
`;
