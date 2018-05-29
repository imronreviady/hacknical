import React from 'react';
import cx from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import recordsActions from '../../redux/actions';
import styles from '../../styles/records.css';
import locales from 'LOCALES';
import ShareRecords from './ShareRecords';
import { RECORDS_SECTIONS } from '../../shared/data';
import Navigation from 'COMPONENTS/Navigation';
import { AnimationComponent } from 'light-ui';

const recordsTexts = locales('dashboard').records;
const sections = Object.keys(RECORDS_SECTIONS).map(key => ({
  id: RECORDS_SECTIONS[key].ID,
  text: RECORDS_SECTIONS[key].TEXT,
}));

class Records extends React.Component {
  get actions() {
    const { actions, activeTab } = this.props;
    const sectionActions = {
      [RECORDS_SECTIONS.RESUME.ID]: {
        fetchShareData: actions.fetchResumeShareData,
      },
      [RECORDS_SECTIONS.GITHUB.ID]: {
        fetchShareData: actions.fetchGithubShareData,
      },
    };
    return {
      ...sectionActions[activeTab],
      onViewTypeChange: actions.onPageViewTypeChange,
    };
  }

  get analysisProps() {
    const { activeTab } = this.props;
    return {
      ...this.props[activeTab],
      text: recordsTexts[activeTab].shareText,
    };
  }

  render() {
    const { activeTab, actions } = this.props;

    return (
      <div className={styles.container}>
        <Navigation
          sections={sections}
          activeSection={activeTab}
          handleSectionChange={actions.onAnalysisDataTabChange}
        />
        <AnimationComponent>
          <ShareRecords
            actions={this.actions}
            index={activeTab}
            {...this.analysisProps}
          />
        </AnimationComponent>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { ...state.records };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(recordsActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Records);
