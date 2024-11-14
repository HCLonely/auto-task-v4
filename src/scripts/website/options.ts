/*
 * @Author       : HCLonely
 * @Date         : 2021-12-11 13:22:26
 * @LastEditTime : 2022-01-09 10:22:32
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-new/src/scripts/website/options.ts
 * @Description  : 网站设置
 */

import Swal from 'sweetalert2';
import __ from '../tools/i18n';
import throwError from '../tools/throwError';
interface options {
  [name: string]: string
}

/**
 * 设置网站选项的函数
 *
 * @param {string} website - 网站的名称。
 * @param {options} options - 包含网站选项的对象。
 * @returns {void} 无返回值。
 *
 * @throws {Error} 如果在设置过程中发生错误，将抛出错误。
 *
 * @description
 * 该函数用于创建一个表单，以便用户可以编辑网站的选项。
 * 表单包含每个选项的名称和当前值，用户可以修改这些值。
 * 提交表单后，将更新的选项保存到存储中，并显示成功消息。
 */
const websiteOptions = function (website: string, options: options): void {
  try {
    let websiteOptionsForm = `<form id="websiteOptionsForm" class="auto-task-form">
  <table class="auto-task-table"><thead><tr><td>${__('option')}</td><td>${__('value')}</td></tr></thead><tbody>`;
    for (const [option, value] of Object.entries(options)) {
      websiteOptionsForm += `<tr><td>${option}</td><td><input class="editOption" type="text" name="${option}" value="${value}"/></td></tr>`;
    }
    websiteOptionsForm += '</tbody></table></form>';
    Swal.fire({
      title: __('websiteOptions'),
      html: websiteOptionsForm,
      showConfirmButton: true,
      confirmButtonText: __('save'),
      showCancelButton: true,
      cancelButtonText: __('close')
    }).then(({ isConfirmed }) => {
      if (isConfirmed) {
        $('#websiteOptionsForm').serializeArray()
          .map((value) => {
            options[value.name] = value.value;
            return value;
          });
        GM_setValue(`${website}Options`, options);
        Swal.fire({
          title: __('changeWebsiteOptionsSuccess'),
          icon: 'success'
        });
      }
    });
  } catch (error) {
    throwError(error as Error, 'websiteOptions');
  }
};

export default websiteOptions;
