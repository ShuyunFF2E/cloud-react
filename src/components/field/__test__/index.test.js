import React from 'react';
import { mount, render } from 'enzyme';
import Field from '../index';
import Form from '../../form/index';
import Input from '../../input/index';
import Button from '../../button/index';

describe('Field', () => {
  it('renders correctly', () => {
    const field = new Field(this, {});
    const wrapper = render(<Form field={field} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should support init value', () => {
    const field = new Field(this, {});
    field.fieldsMeta.name = { value: 'June' };
    const { init } = field;
    const wrapper = mount(
      <Form field={field}>
        {' '}
        <Input {...init('name', {})} />{' '}
      </Form>,
    );
    expect(wrapper.find('Input').getDOMNode().value).toEqual('June');
    wrapper.unmount();
  });

  it('should support setValues and setValue', () => {
    const field = new Field(this, {});
    const { init } = field;

    const onClick = () => {
      field.setValues({ name: 'June', age: 18 });
      field.setValue('sex', 'girl');
    };

    const wrapper = mount(
      <Form field={field}>
        <Input {...init('name', {})} />
        <Input {...init('age', {})} />
        <Input {...init('sex', {})} />
        <Button onClick={onClick} />
      </Form>,
    );

    wrapper.find('Button').at(0).simulate('click');

    expect(field.getValue('name')).toEqual('June');
    expect(field.getValue('age')).toEqual(18);

    wrapper.unmount();
  });

  it('should support getValues and getValue', () => {
    const field = new Field(this, {});
    const { init } = field;

    const onChange = () => {
      field.setValue('name', 'June');
    };

    const wrapper = mount(
      <Form field={field}>
        {' '}
        <Input {...init('name', {})} onChange={onChange} />{' '}
      </Form>,
    );
    wrapper.find('Input').at(0).simulate('change');

    expect(field.getValues()).toEqual({ name: 'June' });
    expect(field.getValues().name).toEqual('June');
    expect(field.getValue('name')).toEqual('June');
    wrapper.unmount();
  });

  it('should support clear', () => {
    const field = new Field(this, {});
    const { init } = field;

    const onClick = () => {
      field.clear();
    };

    const wrapper = mount(
      <Form field={field}>
        <Input {...init('name', { initValue: 'June' })} />
        <Button onClick={onClick} />
      </Form>,
    );

    wrapper.find('Button').at(0).simulate('click');

    expect(field.getValue('name')).toEqual('');

    wrapper.unmount();
  });

  it('should support reset', () => {
    const field = new Field(this, {});
    const { init } = field;

    const onChange = () => {
      field.setValue('name', 'June222');
    };

    const onClick = () => {
      field.reset();
    };

    const wrapper = mount(
      <Form field={field}>
        <Input {...init('name', { initValue: 'June' })} onChange={onChange} />
        <Button onClick={onClick} />
      </Form>,
    );

    wrapper.find('Input').at(0).simulate('change');
    wrapper.find('Button').at(0).simulate('click');

    expect(field.getValue('name')).toEqual('June');

    wrapper.unmount();
  });

  it('should support remove', () => {
    const field = new Field(this, {});
    const { init } = field;

    const onClick = () => {
      field.remove('name');
    };

    const wrapper = mount(
      <Form field={field}>
        <Input {...init('name', { initValue: 'June' })} />
        <Button onClick={onClick} />
      </Form>,
    );

    wrapper.find('Button').at(0).simulate('click');
    expect(field.getValue('name')).toBeUndefined();

    wrapper.unmount();
  });

  it('should support validate', () => {
    const field = new Field(this, {});
    const { init } = field;

    const onClick = () => {
      field.setValues({ name: 'June', age: '年龄' });
    };

    const wrapper = mount(
      <Form field={field}>
        <Input
          {...init('name', {
            rules: [{ required: true, message: '姓名不能为空' }],
          })}
        />
        <Input
          {...init('age', {
            rules: [{ pattern: /^[0-9]$/, message: '年龄必须是数字' }],
          })}
        />
        <Button onClick={onClick} />
      </Form>,
    );

    wrapper.find('Button').at(0).simulate('click');

    field.validate((errs, values) => {
      expect(errs).toEqual({ age: ['年龄必须是数字'] });
      expect(values).toEqual({ name: 'June', age: '年龄' });
    });
    wrapper.unmount();
  });

  it('should support setErrors and setError', () => {
    const field = new Field(this, {});
    const { init } = field;
    const onClick = () => {
      const { name, age, sex } = field.getValues();
      if (!name) {
        field.setError('name', '姓名不能为空');
      }
      if (!/^[0-9]$/.test(age)) {
        field.setError('age', '年龄必须是数字');
      }
      if (!sex) {
        field.setError('sex', '性别不能为空');
      }
      field.setErrors({
        errors1: 'errors1不能为空',
        errors2: 'errors2不能为空',
      });
    };

    const wrapper = mount(
      <Form field={field}>
        <Input
          {...init('name', {
            initValue: 'June',
            rules: [{ required: true, message: '姓名不能为空' }],
          })}
        />
        <Input
          {...init('age', {
            initValue: 'age',
            rules: [{ pattern: /^[0-9]$/, message: '年龄必须是数字' }],
          })}
        />
        <Input
          {...init('sex', {
            initValue: '',
            rules: [{ required: true, message: '性别不能为空' }],
          })}
        />
        <Input
          {...init('errors1', {
            initValue: '',
            rules: [{ required: true, message: 'errors1不能为空' }],
          })}
        />
        <Input
          {...init('errors2', {
            initValue: '',
            rules: [{ required: true, message: 'errors2不能为空' }],
          })}
        />
        <Button onClick={onClick} />
      </Form>,
    );

    wrapper.find('Button').at(0).simulate('click');

    field.validate((errs) => {
      expect(errs.name).toBeUndefined();
      expect(errs.age[0]).toEqual('年龄必须是数字');
      expect(errs.errors1[0]).toEqual('errors1不能为空');
    });

    wrapper.unmount();
  });

  it('should support getErrors and getError', () => {
    const field = new Field(this, {});
    const { init } = field;

    const onClick = () => {
      field.setErrors({ name: '姓名不能为空', age: '年龄必须是数字' });
    };

    const wrapper = mount(
      <Form field={field}>
        <Input
          {...init('name', {
            initValue: '',
            rules: [{ required: true, message: '姓名不能为空' }],
          })}
        />
        <Input
          {...init('age', {
            initValue: 'age',
            rules: [{ pattern: /^[0-9]$/, message: '年龄必须是数字' }],
          })}
        />
        <Input
          {...init('sex', {
            initValue: 'girl',
            rules: [{ pattern: /^[0-9]$/, message: '性别不能为空' }],
          })}
        />
        <Button onClick={onClick} />
      </Form>,
    );

    wrapper.find('Button').at(0).simulate('click');

    expect(field.getError('name')).toEqual(['姓名不能为空']);
    expect(field.getErrors(['name', 'age'])).toEqual({
      name: ['姓名不能为空'],
      age: ['年龄必须是数字'],
    });

    wrapper.unmount();
  });
});
