//-------------------------------------------------
// LEARN STYLES
// ------------------------------------------------

import styled from 'styled-components';

const youtubeBreakpoint = 850;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 72px);
`;

export const Main = styled.main`
  display: flex;
  flex: 1;
  flex-basis: 100%;
  flex-direction: column;

  &.single {
    width: 98%;
    max-width: 768px;
    margin: 0 auto;

    .editor,
    .ql-editor {
      min-height: 68vh;
    }
  }

  &.double {
    .editor,
    .ql-editor {
      min-width: 49vw;
      min-height: 40vh;
    }

    @media (min-width: ${youtubeBreakpoint + 1 + 'px'}) {
      &.double {
        flex-direction: row;

        .editor,
        .ql-editor {
          min-height: 83vh;
        }
      }
    }
  }
`;

export const Editor = styled.div`
  overflow-x: hidden;
  overflow-y: scroll;
`;

export const Card = styled.a`
  display: flex;
  align-items: center;
  justify-content: space-between;

  min-height: 84px;
  padding: 16px;
  margin: 16px 0;

  background-color: #8ca3f4;

  border-radius: 8px;
  font-size: 1.2em;

  h2 {
    margin: 0;
  }

  svg {
    font-size: 1.4em;
  }

  ${'' /* Truncate card text with ellipsis */}
  span, h2 {
    display: block;
    text-align: left;
    width: 75vw;
    @media (min-width: 460px) {
      width: 83vw;
    }
    max-width: 700px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const YouTube = styled.iframe`
  min-width: 50vw;
  @media (max-width: ${youtubeBreakpoint + 'px'}) {
    height: 40vh;
  }
`;
