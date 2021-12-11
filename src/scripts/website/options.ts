/*
 * @Author       : HCLonely
 * @Date         : 2021-12-11 13:22:26
 * @LastEditTime : 2021-12-11 13:49:46
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-new/src/scripts/website/options.ts
 * @Description  :
 */

import Swal from 'sweetalert2';
import __ from '../tools/i18n';
interface options {
  [name: string]: string
}

const websiteOptions = function (website:string, options: options): void {
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
      GM_setValue(`${website}Options`, options); // eslint-disable-line new-cap
      Swal.fire({
        title: __('changeWebsiteOptionsSuccess'),
        icon: 'success'
      });
    }
  });
};

export default websiteOptions;
