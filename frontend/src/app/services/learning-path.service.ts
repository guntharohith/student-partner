import { UserService } from './user.service';
import { LPModel } from './../models/learning-path.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable()
export class LearningPathService {
  backendUrl = environment.backendUrl
  constructor(private http:HttpClient, private userService: UserService) {}
  learningPaths: LPModel[] = [
    // {
    //   name: 'DSA',
    //   category: 'Engineering',
    //   type: 'private',
    //   topics: [
    //     {
    //       topicName: 'Array',
    //       topicDes: `An array is a collection of items stored at contiguous memory locations. 
    //         The idea is to store multiple items of the same type together. This makes it 
    //         easier to calculate the position of each element by simply adding an offset to a base value, i.e.,
    //         the memory location of the first element of the array (generally denoted by the name of the array).`,
    //       resources: [
    //         'https://www.geeksforgeeks.org/array-data-structure/',
    //         'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array',
    //       ],
    //       assessments: [
    //         'https://www.geeksforgeeks.org/write-a-program-to-reverse-an-array-or-string/',
    //         'https://www.geeksforgeeks.org/rearrange-positive-negative-numbers-using-inbuilt-sort-function/',
    //       ],
    //     },
    //     {
    //       topicName: 'LinkedList',
    //       topicDes: `A linked list is a linear data structure, in which the elements are not stored at contiguous 
    //       memory locations.In simple words, a linked list consists of nodes where each node contains a data field and
    //        a reference(link) to the next node in the list.`,
    //       resources: [
    //         'https://www.geeksforgeeks.org/data-structures/linked-list/',
    //         'https://www.tutorialspoint.com/data_structures_algorithms/linked_list_algorithms.htm#:~:text=A%20linked%20list%20is%20a,of%20links%20which%20contains%20items.&text=Next%20%E2%88%92%20Each%20link%20of%20a,the%20first%20link%20called%20First.',
    //       ],
    //       assessments: [
    //         'https://www.geeksforgeeks.org/find-length-of-a-linked-list-iterative-and-recursive/',
    //         'https://www.geeksforgeeks.org/swap-nodes-in-a-linked-list-without-swapping-data/',
    //       ],
    //     },
    //     {
    //       topicName: 'String',
    //       topicDes: `Strings are defined as an array of characters. The difference between a character array and a 
    //       string is the string is terminated with a special character ‘\0’.`,
    //       resources: [
    //         'https://www.geeksforgeeks.org/string-data-structure/',
    //         'https://www.scaler.com/topics/string-in-data-structure/',
    //       ],
    //       assessments: [
    //         'https://www.geeksforgeeks.org/c-program-find-second-frequent-character/',
    //         'https://www.geeksforgeeks.org/c-program-replace-word-text-another-given-word/',
    //       ],
    //     },
    //     {
    //       topicName: 'Tree',
    //       topicDes:
    //         'A tree data structure is a non-linear data structure because it does not store in a sequential manner. It is a hierarchical structure as elements in a Tree are arranged in multiple levels. In the Tree data structure, the topmost node is known as a root node. Each node contains some data, and data can be of any type.',
    //       resources: [
    //         'https://www.geeksforgeeks.org/insertion-binary-tree/',
    //         'https://www.geeksforgeeks.org/tree-traversals-inorder-preorder-and-postorder/',
    //       ],
    //       assessments: [
    //         'https://www.javatpoint.com/tree#:~:text=A%20tree%20data%20structure%20is%20a%20non%2Dlinear%20data%20structure,can%20be%20of%20any%20type.',
    //         'https://www.programiz.com/dsa/trees',
    //       ],
    //     },
    //   ],
    //   email: 'rohithshetty267@gmail.com',
    // },
    // {
    //   name: 'UPSC',
    //   category: 'Public Service',
    //   type: 'public',
    //   topics: [],
    //   email: 'rohithshetty267@gmail.com',
    // },
  ];

  createLearningPath(learingPath:LPModel) {
    return this.http.post(this.backendUrl + 'learningpaths', learingPath, {
      headers: {
        authorization: 'Bearer ' + this.userService.getToken(),
      },
    });
  }

  fetchLearningPaths() {
    return this.http.get<LPModel[]>(this.backendUrl + 'users/get-learningpaths/' + this.userService.getUserName() , {
      headers: {
        authorization: 'Bearer ' + this.userService.getToken(),
      },
    });
  }

  getAllLearningPaths() {
    return this.http.get<LPModel[]>(this.backendUrl + 'learningpaths',
      {
        headers: {
          authorization: "Bearer " + this.userService.getToken()
        }
      }
    )
  }

  deleteLearningPath(id: string) {
    return this.http.delete(this.backendUrl + 'learningpaths/' + id, {
      headers: {
        authorization: 'Bearer ' + this.userService.getToken(),
      }
    });
  }

  getLearningPathById(id: string) {
    return this.http.get<LPModel>(this.backendUrl + 'learningpaths/' + id, {
      headers: {
        authorization: 'Bearer ' + this.userService.getToken(),
      },
    });
  }

  getNumberOfLearningPaths() {
    return this.learningPaths.length;
  }
}
