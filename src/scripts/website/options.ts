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

const websiteOptions = function (website:string, options: options): void {
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
