import { UserService } from './../services/user.service';
import { ResourceModel } from './../models/resource.model';
import { ResourceService } from '../services/resources.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css'],
})
export class ResourcesComponent implements OnInit {
  modal: boolean = false;
  resourceTab: boolean = false;
  resourceForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    link: new FormControl('', Validators.required),
    review: new FormControl('', Validators.required),
    rating: new FormControl('', Validators.required),
    image: new FormControl(),
  });

  resources: ResourceModel[] = [];
  publicResources: ResourceModel[] = [];
  constructor(private resourceService:ResourceService, private userService:UserService){}

  ngOnInit(): void {
    this.resourceService.getResources().subscribe(
      {
        next: res => this.resources = res,
        error: err => console.log(err)
      }
    );
    this.resourceService.getAllResources().subscribe({
      next: (res) => {
        this.publicResources = res.filter((r) => r.userId !== this.userService.getUserId());
      },
      error: (err) => console.log(err),
    });
    
  }

  onSubmit() {
    this.resourceService.addResource(this.resourceForm.value).subscribe(
      {
        next: res => this.resources.push(res),
        error: err => console.log(err)
      }
    );
    this.resourceForm = new FormGroup({
      name: new FormControl(''),
      description: new FormControl(''),
      link: new FormControl(''),
      review: new FormControl(''),
      rating: new FormControl(''),
      image: new FormControl('')
    });
    this.modal = false;
  }

}
