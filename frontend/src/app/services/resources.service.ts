import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { ResourceModel } from '../models/resource.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class ResourceService {
  backendUrl = environment.backendUrl;
  constructor(private http:HttpClient, private userService: UserService) {}
  resources: ResourceModel[] = [
    // {
    //   name: 'DSA Book',
    //   description: 'This book is useful for people preparing for placements.',
    //   link: 'https://www.google.com/aclk?sa=L&ai=DChcSEwjBya_mncj1AhVMQ2AKHQlhDAkYABAJGgJ0bQ&ae=2&sig=AOD64_1AvFfR1A4RIeOFYHnFUN2UsHTh5w&ctype=5&q=&ved=2ahUKEwiToKLmncj1AhUXx4sBHZGwBqkQ9aACegQIARBT&adurl=',
    //   review: 'Nice Book',
    //   rating: '5',
    //   image:
    //     'https://rukminim1.flixcart.com/image/612/612/k3erngw0/book/2/7/9/data-structures-and-algorithms-made-easy-original-imafmjfpfkcsvszs.jpeg?q=70',
    //   email: 'rohithshetty267@gmail.com',
    // },
    // {
    //   name: 'UPSC Book',
    //   description: 'This book is useful for upsc aspirants',
    //   link: 'https://www.google.com/aclk?sa=L&ai=DChcSEwjBya_mncj1AhVMQ2AKHQlhDAkYABAJGgJ0bQ&ae=2&sig=AOD64_1AvFfR1A4RIeOFYHnFUN2UsHTh5w&ctype=5&q=&ved=2ahUKEwiToKLmncj1AhUXx4sBHZGwBqkQ9aACegQIARBT&adurl=',
    //   review: 'Good Book',
    //   rating: '4',
    //   image:
    //     'https://rukminim1.flixcart.com/image/612/612/kklhbbk0/book/p/z/n/upsc-new-syllabus-tips-to-crack-ias-preliminary-and-mains-exam-original-imafzwtr9gguvpvj.jpeg?q=70',
    //   email: 'rohithshetty@gmail.com',
    // },
  ];
  getResources() {
    return this.http.get<ResourceModel[]>(
      this.backendUrl + 'users/get-resources/' + this.userService.getUserName(),
      {
        headers: {
          authorization: 'Bearer ' + this.userService.getToken(),
        },
      }
    );
  }

  getAllResources() {
    return this.http.get<ResourceModel[]>(this.backendUrl + 'resources', {
      headers: {
        authorization: 'Bearer ' + this.userService.getToken(),
      },
    });
  }



  addResource(resource: any) {
    return this.http.post<ResourceModel>(
      this.backendUrl + 'resources/' ,
      {...resource, userId: this.userService.getUserId()},
      {
        headers: {
          authorization: 'Bearer ' + this.userService.getToken(),
        },
      }
    );
  }

  deleteResource(id: string) {
    return this.http.delete(this.backendUrl + 'resources/' + id, {
      headers: {
        authorization: 'Bearer ' + this.userService.getToken(),
      },
    });
  }

  getNumberOfResources() {
    return this.resources.length;
  }
}
