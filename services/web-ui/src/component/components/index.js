import React from 'react';
import flow from 'lodash/flow';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// Ui
import { withStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import {
    Add, NavigateNext, NavigateBefore,
} from '@material-ui/icons';
import Modal from '@material-ui/core/Modal';


// components
import JSONInput from 'react-json-editor-ajrm';
import locale from 'react-json-editor-ajrm/locale/en';
import ComponentsTeaser from './components-teaser';

// actions
import { getComponents, createComponent, getComponentsPage } from '../../action/components';


const useStyles = {
    wrapper: {
        padding: '20px 0',
        justifyContent: 'center',
    },
    modal: {
        backgroundColor: 'white',
        margin: 'auto',
        outline: 'none',
    },
};

class Components extends React.Component {
    state= {
        addComponent: false,
        editorData: null,
    }

    constructor(props) {
        super();
        props.getComponents();
    }

    addComponent = () => {
        this.setState({
            addComponent: true,
        });
    };

    saveComponent = () => {
        this.props.createComponent(this.state.editorData);
        this.setState({
            addComponent: false,
        });
    }

    editorChange(e) {
        if (!e.error) {
            this.setState({
                editorData: e.jsObject,
            });
        }
    }

    // prePage = () => {
    //     if (this.props.components.meta.page === 1) {
    //         this.props.getComponentsPage(this.props.components.meta.totalPages);
    //     } else {
    //         this.props.getComponentsPage(this.props.components.meta.page - 1);
    //     }
    // };

    // nextPage = () => {
    //     if (this.props.components.meta.page === this.props.components.meta.totalPages) {
    //         this.props.getComponentsPage(1);
    //     } else {
    //         this.props.getComponentsPage(this.props.components.meta.page + 1);
    //     }
    // };

    render() {
        const {
            classes,
        } = this.props;

        return (
            <Container className={classes.wrapper}>
                <Grid container spacing={2}>

                    <Grid item xs={8}>
                        <Button variant="outlined" aria-label="Add" onClick={this.addComponent}>
                        Add<Add/>
                        </Button>
                    </Grid>
                    {this.props.components.meta && <Grid item xs={4}>
                        <Grid container justify="flex-end" spacing={2}>
                            <Grid item >
                                <InputLabel>Components: </InputLabel>{this.props.components.meta.total}
                            </Grid>
                            <Grid item >
                                <Button variant="outlined" aria-label="before" onClick={this.prePage} >
                                    <NavigateBefore/>
                                </Button>
                            </Grid>
                            <Grid item >
                                {this.props.components.meta.page}/{this.props.components.meta.totalPages}
                            </Grid>
                            <Grid item>
                                <Button variant="outlined" aria-label="next" onClick={this.nextPage}>
                                    <NavigateNext/>
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>}


                </Grid>
                <Grid container justify="center" spacing={2}>
                    {
                        this.props.components.all.length && this.props.components.all.map(item => <ComponentsTeaser key={`componentTeaser-${item.id}`} data={item}/>)
                    }
                </Grid>

                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.addComponent}
                    onClose={ () => { this.setState({ addComponent: false }); }}
                    style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
                >
                    <div className={classes.modal}>
                        <JSONInput
                            id = 'jsonEdit'
                            locale = {locale}
                            theme = 'dark_vscode_tribute'
                            height = '550px'
                            width = '600px'
                            onChange={this.editorChange.bind(this)}
                        />
                        <Button variant="outlined" aria-label="Add" onClick={this.saveComponent}>
                            Save
                        </Button>
                    </div>

                </Modal>
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    components: state.components,
});
const mapDispatchToProps = dispatch => bindActionCreators({
    getComponents,
    createComponent,
    getComponentsPage,
}, dispatch);

export default flow(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    ),
    withStyles(useStyles),
)(Components);
