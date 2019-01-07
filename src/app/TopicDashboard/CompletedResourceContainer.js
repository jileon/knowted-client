import React from 'react';
import ResourceItem from './ResourceItem';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
export class CompletedResourceContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAll: false
    };
  }

  handletoggle = () => {
    this.setState(prevState => ({ showAll: !prevState.showAll }));
  };

  render() {
    const { resources, resourceOrder } = this.props;
    return (
      <section className="completed-resources-container">
        <div className="complete-header">
          <div className="complete-title-cont">
            <h3 className="complete-title">Completed Resources</h3>
          </div>
          <div className="show-button-cont">
            <button
              className="toggle-compl-btn"
              type="button"
              onClick={this.handletoggle}
            >
              {this.state.showAll ? (
                <span>
                  <span className="hide-all">Hide All</span> <FaChevronUp />
                </span>
              ) : (
                <span>
                  <span className="show-all">Show All</span> <FaChevronDown />
                </span>
              )}
            </button>
          </div>
        </div>

        {this.state.showAll ? (
          <ul className="completed-resources-list">
            {resourceOrder.map(rescID => {
              if (
                resourceOrder &&
                resources &&
                resourceOrder.length > 0 &&
                resources[rescID]
              ) {
                return resources[rescID].completed === true ? (
                  <li
                    key={rescID}
                    className=" resource-item completed-resource-item"
                  >
                    <ResourceItem resource={resources[rescID]} />
                  </li>
                ) : null;
              } else {
                return null;
              }
            })}
          </ul>
        ) : null}
      </section>
    );
  }
}

export default CompletedResourceContainer;
