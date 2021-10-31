import React from 'react';
import { mount, render } from 'enzyme';
import Layout from '../index';

const { Header, Content, Footer, Sider } = Layout;

describe('Layout', () => {

    it('basic layout should render correctly', () => {
        const wrapper = render((
            <Layout>
                <Header>header</Header>
                <Content>content</Content>
                <Footer>footer</Footer>
            </Layout>
        ));
        expect(wrapper).toMatchSnapshot();
    });
    it('left to right layout should render correctly', () => {
        const wrapper = render((
            <Layout hasSider>
                <Sider>Sider</Sider>
                <Layout>
                    <Header>Header</Header>
                    <Content>Content</Content>
                    <Footer>Footer</Footer>
                </Layout>
            </Layout>
        ));
        expect(wrapper).toMatchSnapshot();
    });
    it('layout property hasSider', () => {
        console.log(document);
        const wrapper = mount((
            <Layout  hasSider>
                <Sider>Sider</Sider>
                <Layout>
                    <Header>Header</Header>
                    <Content>Content</Content>
                    <Footer>Footer</Footer>
                </Layout>
            </Layout>
        ));
        const hasSide = wrapper.find('section.cloud-layout-has-sider');
        expect(hasSide).toBeTruthy();
    })

});
