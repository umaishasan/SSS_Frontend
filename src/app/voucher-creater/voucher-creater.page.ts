import { Component, OnInit } from '@angular/core';
import { NetworkService } from '../service/network.service';
import { ToastedService } from '../service/toasted.service';
import pdfmake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfmake.vfs = pdfFonts.pdfMake.vfs;
interface Classs {
  clas: string,
  name: string,
}
@Component({
  selector: 'app-voucher-creater',
  templateUrl: './voucher-creater.page.html',
  styleUrls: ['./voucher-creater.page.scss'],
})
export class VoucherCreaterPage implements OnInit {
  selectStuden: any;
  tution: number;
  fine: number;
  registration: number;
  security: number;
  number: number;
  clase: Classs[] = [{ clas: 'class1s', name: 'Class1' }, { clas: 'class2s', name: 'Class2' }, { clas: 'class3s', name: 'Class3' }, { clas: 'class4s', name: 'Class4' }, { clas: 'class5s', name: 'Class5' }, { clas: 'class6s', name: 'Class6' }, { clas: 'class7s', name: 'Class7' }, { clas: 'class8s', name: 'Class8' }, { clas: 'class9s', name: 'Class9' }, { clas: 'class10s', name: 'Class10' }];
  sClass: string;
  sSudent: string;
  dataa: any;
  studentIdd: any;
  stuProfile: any;
  pdfObj = null;


  constructor(private network: NetworkService, private toast: ToastedService) { }

  ngOnInit() { }

  createpdf() {
    var arrID;
    var issueDate = new Date();
    var dueDate = new Date();
    dueDate.setDate(issueDate.getDate() + 7);
    for (let i = 0; i < this.stuProfile.length; i++) {
      arrID = this.stuProfile[i].id;
      this.number = this.tution + this.security + this.registration + this.fine;
      var docDefinition = {
        content: [
          {
            image: 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAzCAIAAABaAcxDAAAAbXpUWHRSYXcgcHJvZmlsZSB0eXBlIGV4aWYAAHjaXYzLDYBACETvVGEJs4CwlONBEzuwfHEl2ehLgGH40H6dBy0DV9LVu4UZEg0N3lJ0vDDQGA2SupVX1aI7dPbEhi/8RH6LuSRcM/n5Ms9opBurQiAaeDU49AAACgJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+Cjx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDQuNC4wLUV4aXYyIj4KIDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+CiAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgIHhtbG5zOmV4aWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vZXhpZi8xLjAvIgogICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgIGV4aWY6UGl4ZWxYRGltZW5zaW9uPSI1MCIKICAgZXhpZjpQaXhlbFlEaW1lbnNpb249IjUxIgogICB0aWZmOkltYWdlV2lkdGg9IjUwIgogICB0aWZmOkltYWdlSGVpZ2h0PSI1MSIKICAgdGlmZjpPcmllbnRhdGlvbj0iMSIvPgogPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAg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'
            , alignment: 'center',
          },
          {
            text: 'Smart Schooling System',
            bold: true,
            fontSize: 18,
            alignment: 'center',
          },
          {
            text: 'Issue Date: ' + issueDate.toDateString(),
            alignment: 'right',
            fontSize: 12,
            margin: [0, 15, 0, 0],
          },
          {
            text: 'Due Date: ' + dueDate.toDateString(),
            alignment: 'right',
            fontSize: 12,
            margin: [0, 0, 0, 5],
          },
          {
            text: 'Note: Fee will be submit from school counter.',
            bold: true,
            italic: 'true',
            fontSize: 12,
            margin: [0, 20, 0, 20],
            color: 'red',
          },
          {
            columns: [
              {
                text: 'Mr./Mrs.: ', bold: true, fontSize: 12, margin: [0, 0, 0, 1],
              },
              {
                text: this.stuProfile[i].parentNAME, fontSize: 12, margin: [0, 0, 0, 1],
              }
            ],
          },
          {
            columns: [
              {
                text: 'Student Name.: ', bold: true, fontSize: 12, margin: [0, 0, 0, 1],
              },
              {
                text: this.stuProfile[i].username, fontSize: 12, margin: [0, 0, 0, 1],
              }
            ],
          },
          {
            columns: [
              {
                text: 'Student Roll No.: ', bold: true, fontSize: 12, margin: [0, 0, 0, 1],
              },
              {
                text: this.stuProfile[i].id, fontSize: 12, margin: [0, 0, 0, 1],
              }
            ],
          },
          {
            columns: [
              {
                text: 'Class: ', bold: true, fontSize: 12, margin: [0, 0, 0, 1],
              },
              {
                text: this.stuProfile[i].class, fontSize: 12, margin: [0, 0, 0, 1],
              }
            ],
          },
          {
            columns: [
              {
                text: 'Section: ', bold: true, fontSize: 12, margin: [0, 0, 0, 1],
              },
              {
                text: this.stuProfile[i].section, fontSize: 12, margin: [0, 0, 0, 1],
              }
            ],
          },
          {
            canvas: [
              {
                type: 'line',
                x1: 0,
                y1: 30,
                x2: 515,
                y2: 30,
                lineWidth: 1
              }
            ]
          },
          {
            columns: [
              {
                text: 'Tution Fee: ', fontSize: 12, margin: [0, 5, 0, 0], alignment: 'left',
              },
              {
                text: this.tution + '/-', fontSize: 12, margin: [0, 5, 0, 0], alignment: 'right',
              }
            ],
          },
          {
            columns: [
              {
                text: 'Regisration Fee: ', fontSize: 12, margin: [0, 5, 0, 0], alignment: 'left',
              },
              {
                text: this.registration + '/-', fontSize: 12, margin: [0, 5, 0, 0], alignment: 'right',
              }
            ],
          },
          {
            columns: [
              {
                text: 'Fine: ', fontSize: 12, margin: [0, 5, 0, 0], alignment: 'left',
              },
              {
                text: this.fine + '/-', fontSize: 12, margin: [0, 5, 0, 0], alignment: 'right',
              }
            ],
          },
          {
            columns: [
              {
                text: 'Security Fee: ', fontSize: 12, margin: [0, 5, 0, 0], alignment: 'left',
              },
              {
                text: this.security + '/-', fontSize: 12, margin: [0, 5, 0, 0], alignment: 'right',
              }
            ],
          },
          {
            canvas: [
              {
                type: 'line',
                x1: 0,
                y1: 5,
                x2: 515,
                y2: 5,
                lineWidth: 1
              }
            ]
          },
          {
            columns: [
              {
                text: 'Total: ', fontSize: 12, margin: [0, 5, 0, 0], alignment: 'left',
              },
              {
                text: this.number + '/-', fontSize: 12, margin: [0, 5, 0, 0], alignment: 'right',
              }
            ],
          },
          {
            text: '1000 Penalty will be imposed after due date. Any query about fee voucher, please contact through Email: musharraf@gmail.com and Phone No.: 03124567890.',
            margin: [0, 25, 0, 15],
          },
          {
            columns: [
              {
                text: 'Sign: ', fontSize: 12, margin: [5, 25, 0, 0],
              },
              {
                canvas: [
                  {
                    type: 'line',
                    x1: -220,
                    y1: 35,
                    x2: -90,
                    y2: 35,
                    lineWidth: 1,
                  }
                ]
              }
            ],
          },
          {
            text: 'cut it here for receipt',
            fontSize: 8,
            margin: [0, 35, 0, 1],
            alignment: 'center',
          },
          {
            canvas: [
              {
                type: 'line',
                x1: -45,
                y1: 2,
                x2: 555,
                y2: 2,
                lineWidth: 0.5,
              }
            ]
          },
          {
            text: 'Issue Date: ' + issueDate.toDateString(),
            alignment: 'right',
            fontSize: 12,
            margin: [0, 10, 0, 0],
          },
          {
            text: 'Due Date: ' + dueDate.toDateString(),
            alignment: 'right',
            fontSize: 12,
            margin: [0, 0, 0, 5],
          },
          {
            columns: [
              {
                text: 'Mr./Mrs.: ', bold: true, fontSize: 12, margin: [0, 20, 0, 1],
              },
              {
                text: this.stuProfile[i].parentNAME, fontSize: 12, margin: [0, 20, 0, 1],
              }
            ],
          },
          {
            columns: [
              {
                text: 'Student Name.: ', bold: true, fontSize: 12, margin: [0, 0, 0, 1],
              },
              {
                text: this.stuProfile[i].username, fontSize: 12, margin: [0, 0, 0, 1],
              }
            ],
          },
          {
            columns: [
              {
                text: 'Student Roll No.: ', bold: true, fontSize: 12, margin: [0, 0, 0, 1],
              },
              {
                text: this.stuProfile[i].id, fontSize: 12, margin: [0, 0, 0, 1],
              }
            ],
          },
          {
            columns: [
              {
                text: 'Class: ', bold: true, fontSize: 12, margin: [0, 0, 0, 1],
              },
              {
                text: this.stuProfile[i].class, fontSize: 12, margin: [0, 0, 0, 1],
              }
            ],
          },
          {
            columns: [
              {
                text: 'Section: ', bold: true, fontSize: 12, margin: [0, 0, 0, 1],
              },
              {
                text: this.stuProfile[i].section, fontSize: 12, margin: [0, 0, 0, 1],
              }
            ],
          },
          {
            columns: [
              {
                columns: [
                  {
                    text: 'Sign: ', fontSize: 12, margin: [0, 25, 0, 0],
                  },
                  {
                    canvas: [
                      {
                        type: 'line',
                        x1: 50,
                        y1: 35,
                        x2: -100,
                        y2: 35,
                        lineWidth: 1,
                      }
                    ]
                  },
                ],
              },
              {
                text: 'Total: ' + this.number + '/-', fontSize: 12, margin: [0, 25, 0, 0], alignment: 'right',
              }
            ],
          }
        ],
        pageSize: 'A4',
        pageOrientation: 'portrait'
      };
    }
    this.pdfObj = pdfmake.createPdf(docDefinition);
    this.pdfObj.getBuffer((buffer) => {
      console.log(buffer);
      var task = { Voucher: buffer }
      this.network.putDataById('students', arrID, task).then(data => {
        console.log(data);
      });
    });
    this.toast.showToast("voucher created successfully!")
  }

  onChange() {
    this.network.getSpecificDataforAttendance(this.sClass, "Student").then(data => {
      this.dataa = data;
      console.log("all data", this.dataa);
      for (let i = 0; i < this.dataa.length; i++) {
        this.studentIdd = this.dataa[i];
      }
    });
    console.log(this.sClass);
  }

  inChange() {
    console.log(this.sSudent);
    var arrr = [];
    this.network.getDataById('students', this.sSudent).then(data => {
      console.log(data);
      arrr.push(data);
      console.log(arrr);
    });
    this.stuProfile = arrr;
  }
}
